<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <FileExplorer></FileExplorer>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Music Player</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <MusicPlayer></MusicPlayer>
        </v-main>
    </v-app>
</template>

<script>
import FileExplorer from "@/components/FileExplorer.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";

export default {
    name: "App",

    components: { FileExplorer, MusicPlayer },

    data: () => ({
        drawer: true,
    }),
};
</script>
