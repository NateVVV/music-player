export function animations(wave) {
    const animation = {
        Arcs: wave?.animations.Arcs,
        Circles: wave?.animations.Circles,
        Cubes: wave?.animations.Cubes,
        Flower: wave?.animations.Flower,
        Glob: wave?.animations.Glob,
        Lines: wave?.animations.Lines,
        Shine: wave?.animations.Shine,
        Square: wave?.animations.Square,
        Turntable: wave?.animations.Turntable,
        Wave: wave?.animations.Wave,
    };
    return animation;
}

export function createAnimation(wave, type, options = defaultOptions) {
    if (!wave) return;
    const constructor = animations(wave)[type];
    const animation = new constructor(options);
    animation.type = type;
    animation.intervalId = setInterval(() => {
        animation._options.fillColor.rotate += 10;
        animation._options.fillColor.rotate %= 360;
    }, 10);
    return animation;
}

export const defaultOptions = {
    fillColor: {
        gradient: ["#060070", "#710083", "#bd4446"],
        rotate: 45,
    },
    lineWidth: 3,
    count: 60,
    lineColor: "#d7821cff",
    diameter: 200,
    frequencyBand: "mids",
    glow: { color: "#fff9c4", strength: 3 },
};
