import { PrismaClient, Artist, Album } from '@prisma/client'

const prisma = new PrismaClient()

const createArtistAndAlbum = async () => {
    const newArtist: Omit<Artist, 'id'> = {
        name: 'Nico',
        image: 'http://image.here'
    };
    const newAlbum: Omit<Album, 'id'> = {
        name: 'Woolwych blues',
        image: 'http://album.img'
    };

    // const locatedArtist = await prisma.artist.findFirst({
    //     where: {
    //         name: newArtist.name
    //     }
    // });

    const album = await prisma.album.create({
        data: {
            ...newAlbum,
            artists: {
                create: [newArtist],
                // connectOrCreate: {
                // where: {
                //     id: locatedArtist?.id,
                // },
                // create: newArtist,
                // }
            }
        }
    })

    const theArtist = await prisma.artist.
        findFirst({
            where: {
                albums: {
                    every: { id: album.id }
                }
            },
            include: { albums: true }
        })

    return theArtist
}

createArtistAndAlbum().then(console.log);


const findAlbum = async (artistId: number) =>
    await prisma.album.findFirst({
        where: {
            artists: {
                every: { id: artistId }
            },
        },
        include: { artists: true }
    });

findAlbum(1).then(console.log);

const newAlbumInfo = {
    id: 3,
    name: "Niko-cola",
    image:
        "https://stock.com.py/images/thumbs/0178885.png",
};

const updateAlbum = async (album: Album) =>
    await prisma.album.update({
        where: { id: album.id },
        data: album
    });

updateAlbum(newAlbumInfo).then(console.log);

const deleteSingleAlbum = async (albumId: number) =>
    await prisma.album.delete({
        where: { id: albumId },
    });


const deleteAllArtistsAlbums = async (artistId: number) =>
    await prisma.album.deleteMany({
        where: {
            artists: {
                some: { id: artistId }
            }
        },
    });

const allArtistsInAlbum = async (artistId: number) =>
    await prisma.album.findMany({
        where: {
            artists: {
                every: { id: artistId }
            }
        }
    })



const allAlbums = async () => await prisma.album.findMany({ include: { artists: true } });


const replaceAllArtistsForAGivenAlbumToRickAstley = async (albumId: number) =>
    await prisma.artist.updateMany({
        where: {
            albums: {
                some: {
                    id: albumId
                }
            }
        },
        data: {
            name: "Rick Astley"
        }
    });

replaceAllArtistsForAGivenAlbumToRickAstley(1)
    .then(allAlbums)
    .then(console.log)
