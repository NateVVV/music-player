export function animations(wave) {
    const animation = {
        Arcs: {
            ctr: wave?.animations.Arcs,
            options: [
                "count",
                "diameter",
                "fillColor",
                "frequencyBand",
                "glow",
                "lineColor",
                "lineWidth",
                "rounded",
            ],
        },
        Circles: {
            ctr: wave?.animations.Circles,
            options: [
                "count",
                "diameter",
                "fillColor",
                "frequencyBand",
                "glow",
                "lineColor",
                "lineWidth",
            ],
        },
        Cubes: {
            ctr: wave?.animations.Cubes,
            options: [
                "bottom",
                "center",
                "count",
                "cubeHeight",
                "fillColor",
                "frequencyBand",
                "gap",
                "glow",
                "left",
                "lineColor",
                "lineWidth",
                "mirroredX",
                "mirroredY",
                "radius",
                "right",
                "top",
            ],
        },
        Flower: {
            ctr: wave?.animations.Flower,
            options: [
                "count",
                "diameter",
                "fillColor",
                "frequencyBand",
                "glow",
                "lineColor",
                "lineWidth",
                "rotate",
                "rounded",
            ],
        },
        Glob: {
            ctr: wave?.animations.Glob,
            options: [
                "count",
                "diameter",
                "fillColor",
                "frequencyBand",
                "glow",
                "lineColor",
                "lineWidth",
                "mirroredX",
                "rounded",
            ],
        },
        Lines: {
            ctr: wave?.animations.Lines,
            options: [
                "bottom",
                "center",
                "count",
                "frequencyBand",
                "glow",
                "left",
                "lineColor",
                "lineWidth",
                "mirroredX",
                "mirroredY",
                "right",
                "rounded",
                "top",
            ],
        },
        Shine: {
            ctr: wave?.animations.Shine,
            options: [
                "count",
                "diameter",
                "frequencyBand",
                "glow",
                "lineColor",
                "lineWidth",
                "offset",
                "rotate",
                "rounded",
            ],
        },
        Square: {
            ctr: wave?.animations.Square,
            options: [
                "count",
                "diameter",
                "frequencyBand",
                "glow",
                "lineColor",
                "lineWidth",
                "rounded",
            ],
        },
        Turntable: {
            ctr: wave?.animations.Turntable,
            options: [
                "count",
                "cubeHeight",
                "diameter",
                "fillColor",
                "frequencyBand",
                "gap",
                "glow",
                "lineColor",
                "lineWidth",
                "rotate",
                "rounded",
            ],
        },
        Wave: {
            ctr: wave?.animations.Wave,
            options: [
                "bottom",
                "center",
                "count",
                "fillColor",
                "frequencyBand",
                "glow",
                "left",
                "lineColor",
                "lineWidth",
                "mirroredX",
                "mirroredY",
                "right",
                "rounded",
                "top",
            ],
        },
    };
    return animation;
}

export function createAnimation(wave, type, options = defaultOptions()) {
    if (!wave) return;
    const constructor = animations(wave)[type].ctr;
    const animation = new constructor(options);
    animation.type = type;
    return animation;
}

export function rotate(animation, speed, stepSize = 10) {
    // clear old interval (if existing)
    stopRotation(animation);

    animation.intervalId = setInterval(() => {
        animation._options.fillColor.rotate += stepSize;
        animation._options.fillColor.rotate %= 360;
    }, speed);
}

export function stopRotation(animation) {
    if (animation.intervalId) {
        clearInterval(animation.intervalId);
    }
    animation.intervalId = undefined;
}

export const defaultOptions = () => ({
    bottom: null,
    center: null,
    count: 60,
    cubeHeight: null,
    diameter: 200,
    fillColor: {
        gradient: ["#060070ff", "#710083ff", "#bd4446ff"],
        rotate: 45,
    },
    frequencyBand: "mids",
    gap: null,
    glow: { color: "#fff9c4ff", strength: 3 },
    left: null,
    lineColor: "#d7821cff",
    lineWidth: 3,
    mirroredX: null,
    mirroredY: null,
    offset: null,
    radius: null,
    right: null,
    rotate: null,
    rounded: null,
    top: null,
});
