<template>
    <v-container>
        <audio controls id="audioElm">
            <source id="audioSrc" />
            Your browser does not support the audio format.
        </audio>
    </v-container>
</template>

<script>
import eventBus from "@/event-bus.js";

export default {
    name: "MusicPlayer",
    data: () => ({
        //
    }),
    mounted() {
        eventBus.$on("track-selection", (track) => {
            this.loadMusic(track);
        });
    },
    methods: {
        loadMusic(track) {
            const audio = document.getElementById("audioElm");
            const audioSrc = document.getElementById("audioSrc");

            audioSrc.type = track.type;
            if (track) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    audioSrc.src = e.target.result;
                    audio.load();
                };
                reader.readAsDataURL(track);
            }
        },
    },
};
</script>
