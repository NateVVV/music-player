<template>
    <v-container>
        <v-btn @click="addGlob">Add Glob</v-btn>
        <template v-for="(item, i) in animations">
            <GlobAnimation
                :key="i"
                :wave="wave"
                :item="item"
                :index="i"
                @change-frequency-band="changeFrequencyBand"
            ></GlobAnimation>
        </template>
    </v-container>
</template>

<script>
import eventBus from "@/event-bus.js";

import GlobAnimation from "@/components/GlobAnimation.vue";

export default {
    name: "AnimationPanel",
    components: { GlobAnimation },
    data: () => ({
        wave: null,
        animations: [],
        frequencyBands: ["base", "lows", "mids", "highs"],
        frequencyBandHelpers: [],
    }),
    mounted() {
        eventBus.$on("wave-instantiated", (wave) => {
            this.wave = wave;
        });
    },
    watch: {
        wave(newInstance) {
            // add default animation
            const g = new newInstance.animations.Glob({
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
            newInstance.addAnimation(g);

            window.setInterval(() => {
                g._options.fillColor.rotate += 3;
                g._options.fillColor.rotate %= 360;
            }, 10);
            g.type = "Glob";
            this.frequencyBandHelpers.push(g._options.frequencyBand);
            this.animations.push(g);
        },
    },
    methods: {
        addGlob() {
            if (!this.wave) return;
            this.animations.push(this.animations.length);
        },
        changeFrequencyBand(frequencyBand, index) {
            this.animations[index]._options.frequencyBand = frequencyBand;
        },
    },
};
</script>
