<template>
  <v-container>
    <v-row class="text-center">
      <v-col col="12">
        <v-card class="overflow-hidden">
          <v-app-bar
            absolute
            color="indigo darken-2"
            dark
            shrink-on-scroll
            prominent
            scroll-target="#scrolling"
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>
          <v-sheet id="scrolling" class="overflow-y-auto" max-height="600">
            <v-container style="height: 1000px;"></v-container>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Header",
  data: () => ({}),
};
</script>