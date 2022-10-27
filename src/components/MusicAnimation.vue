<template>
    <canvas
        id="musicAnimation"
        style="witdh: 100; height: 100"
        width="1065"
        height="732"
    >
    </canvas>
</template>

<script>
import { Wave } from "@foobar404/wave";

export default {
    name: "MusicAnimation",
    data: () => ({
        //
    }),
    mounted() {
        const canvasElement = document.getElementById("musicAnimation");
        const audioElement = document.getElementById("audioElm");

        const wave = new Wave(audioElement, canvasElement);

        const g = new wave.animations.Glob({
            fillColor: {
                gradient: ["#060070", "#710083", "#bd4446"],
                rotate: 45,
            },
            lineWidth: 3,
            count: 60,
            lineColor: "#d7821c",
            diameter: 200,
            frequencyBand: "mids",
            glow: { color: "#fff9c4", strength: 3 },
        });
        wave.addAnimation(g);

        window.setInterval(() => {
            console.log(g._options.fillColor.rotate);
            g._options.fillColor.rotate += 3;
            g._options.fillColor.rotate %= 360;
        }, 10);
    },
};
</script>

<style scoped></style>
