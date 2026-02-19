export const CAR_DATA = {
    name: "Aston Martin Valhalla",
    price: "$800,000",
    designDescription: "A masterpiece of aerodynamic efficiency and stunning beauty. The Valhalla represents the next generation of Aston Martin performance.",
    engineType: "4.0L Twin-Turbo V8 Hybrid",
    horsepower: "937 HP",
    sequence: {
        folderName: "aston",
        totalFrames: 240,
        filenamePattern: (index: number) => `ezgif-frame-${String(index).padStart(3, '0')}.jpg`,
    },
};
