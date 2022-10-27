<template>
    <v-card class="ma-2 pa-2">
        <v-container>
            <v-row no-gutters>
                <v-col cols="12">{{ glob.type }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="6">Count</v-col>
                <v-col cols="6"
                    ><v-slider
                        v-model="glob._options.count"
                        min="10"
                        max="191"
                        thumb-label
                    ></v-slider
                ></v-col>
            </v-row>
            <v-row>
                <v-col cols="6">Diameter</v-col>
                <v-col cols="6"
                    ><v-slider
                        v-model="glob._options.diameter"
                        min="0"
                        max="800"
                        thumb-label
                    ></v-slider
                ></v-col>
            </v-row>
        </v-container>
        <div>fill color: {{ glob._options.fillColor }}</div>
        <v-row>
            <v-col cols="6">Frequency Band</v-col>
            <v-col cols="6"
                ><v-slider
                    min="0"
                    max="3"
                    thumb-label
                    @change="changeFrequencyBand"
                    ref="frequencySlider"
                    v-model="frequencyBand"
                >
                    <template v-slot:thumb-label="{ value }">
                        {{ frequencyBands[value] }}
                    </template>
                </v-slider></v-col
            >
        </v-row>
        <div>frequency band: {{ glob._options.frequencyBand }}</div>
        <div>glow: {{ glob._options.glow }}</div>
        <div>line color: {{ glob._options.lineColor }}</div>
        <div>line width: {{ glob._options.lineWidth }}</div>
        <div>mirrored X: {{ glob._options.mirroredX }}</div>
        <div>rounded: {{ glob._options.rounded }}</div>
        <div>rotate:</div>
    </v-card>
</template>

<script>
export default {
    name: "GlobAnimation",
    props: ["wave", "item", "index"],
    data: () => ({
        frequencyBands: ["base", "lows", "mids", "highs"],
        glob: null,
        frequencyBand: null,
    }),
    created() {
        this.glob = this.item;
    },
    mounted() {
        this.frequencyBand = this.frequencyBands.indexOf(
            this.glob._options.frequencyBand
        );
    },
    methods: {
        changeFrequencyBand(value) {
            const frequencyBand = this.frequencyBands[value];
            this.glob._options.frequencyBand = frequencyBand;
            // may not be necessary (to send the update)
            this.$emit("change-frequency-band", frequencyBand, this.index);
        },
    },
};
</script>
