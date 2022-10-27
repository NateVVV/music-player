<template>
    <v-app id="inspire">
        <v-app-bar app color="primary" dark>
            <v-btn icon @click="drawer = !drawer"
                ><v-icon>mdi-menu</v-icon></v-btn
            >
            <v-toolbar-title>Music Player</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="animationPanel = !animationPanel"
                ><v-icon>mdi-cog</v-icon></v-btn
            >
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app>
            <FileExplorer></FileExplorer>
        </v-navigation-drawer>

        <v-navigation-drawer app right v-model="animationPanel" width="400">
            <AnimationPanel></AnimationPanel>
        </v-navigation-drawer>

        <v-main>
            <MusicAnimation></MusicAnimation>
            <MusicPlayer v-if="true"></MusicPlayer>
        </v-main>
    </v-app>
</template>

<script>
import FileExplorer from "@/components/FileExplorer.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import MusicAnimation from "@/components/MusicAnimation.vue";
import AnimationPanel from "@/components/AnimationPanel.vue";

export default {
    name: "App",

    components: { FileExplorer, MusicPlayer, MusicAnimation, AnimationPanel },

    data: () => ({
        drawer: true,
        animationPanel: false,
    }),
};
</script>
