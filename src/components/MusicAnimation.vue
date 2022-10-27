<template>
    <div id="canvas-wrapper" ref="wrapper">
        <canvas
            id="musicAnimation"
            style="witdh: 100; height: 100"
            width="300"
            height="732"
            ref="canvas"
        >
        </canvas>
    </div>
</template>

<script>
import { Wave } from "@foobar404/wave";

export default {
    name: "MusicAnimation",
    data: () => ({
        ro: null,
    }),
    mounted() {
        const audioElement = document.getElementById("audioElm");
        this.ro = new ResizeObserver(this.onResize);
        this.ro.observe(this.$refs.wrapper);

        this.$refs.canvas.setAttribute("width", this.$refs.wrapper.clientWidth);
        this.$refs.canvas.setAttribute(
            "height",
            this.$refs.wrapper.clientHeight
        );

        const wave = new Wave(audioElement, this.$refs.canvas);

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
            g._options.fillColor.rotate += 3;
            g._options.fillColor.rotate %= 360;
        }, 10);
    },
    methods: {
        onResize() {
            this.$refs.canvas.setAttribute(
                "width",
                this.$refs.wrapper.clientWidth
            );
            /*
            this.$refs.canvas.setAttribute(
                "height",
                this.$refs.wrapper.clientHeight
            );
            */
        },
    },
};
</script>

<style scoped>
#canvas-wrapper {
    width: 100%;
    height: 80%;
}
</style>
