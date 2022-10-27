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
import eventBus from "@/event-bus.js";

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
        eventBus.$emit("wave-instantiated", wave);
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
