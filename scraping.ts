"use server";
import * as cheerio from "cheerio";

interface Author {
    username: string | undefined;
    profileImageUrl: string | undefined;
    twitter: string | undefined;
}

interface Photo {
    id: number;
    url: string;
    profileUrl: string;
    tags: string[];
    author: any;
}

const UNSPLASH_URL = "https://unsplash.com/s/photos/golden-gate";

export async function scrapingPhotos(
    startIndex = 0,
    numberPhotos = 20
): Promise<Photo[]> {
    try {
        const response = await fetch(UNSPLASH_URL, { cache: "no-store" });
        const data = await response.text();
        const $ = cheerio.load(data);
        const photos: Photo[] = [];

        const authorProfiles: Array<Promise<Author | null>> = [];

        $("figure").each((index, element) => {
            if (index < startIndex) {
                return;
            }
            if (index >= startIndex + numberPhotos) {
                return false;
            }
            const imgElement = $(element).find("img[srcset]").last();
            const srcSet = imgElement.attr("srcset");
            const tags: string[] = [];

            $(element)
                .find('div > a[class*="VyS40"]')
                .each((_, tagElement) => {
                    const tag = $(tagElement).text().trim();
                    if (tag) {
                        tags.push(tag);
                    }
                });

            const imgUrl = srcSet
                ?.split(",")
                .map((item) => item.trim().split(" ")[0])
                .pop();
            const profileLinkElement = $(element)
                .find("a.OQSsT, a.BkSVh")
                .first();
            const profileUrl = profileLinkElement.attr("href");

            if (imgUrl && profileUrl) {
                const authorProfilePromise = scrapeAuthorProfile(
                    `https://unsplash.com${profileUrl}`
                );
                authorProfiles.push(authorProfilePromise);

                photos.push({
                    id: index,
                    url: imgUrl,
                    profileUrl: `https://unsplash.com${profileUrl}`,
                    tags: tags,
                    author: null,
                });
            }
        });

        // Resolver todas las promesas de los autores
        const resolvedAuthors = await Promise.all(authorProfiles);

        // Asignar los datos de los autores resueltos a las fotos correspondientes
        for (let i = 0; i < photos.length; i++) {
            photos[i].author = resolvedAuthors[i];
        }

        return photos;
    } catch (error) {
        console.error("Error al extraer datos de Unsplash:", error);
        return [];
    }
}

async function scrapeAuthorProfile(profileUrl: string) {
    try {
        const response = await fetch(profileUrl);
        const data = await response.text();
        const $ = cheerio.load(data);

        let username = $('meta[property="og:title"]').attr("content");
        if (username) {
            username = username.split("|")[0].trim();
        }
        const srcSet = $("img.Lg6wf.eqnCe").attr("srcset");
        const profileImageUrl = srcSet
            ?.split(",")
            .map((item) => item.trim().split(" ")[0])
            .pop();
        const twitter = $('meta[name="twitter:creator"]').attr("content");

        return {
            username,
            profileImageUrl,
            twitter,
        };
    } catch (error) {
        console.error(
            `Error al extraer datos del perfil: ${profileUrl}`,
            error
        );
        return null;
    }
}
