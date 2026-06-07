<template>
  <ion-app>
    <ion-split-pane when="lg" content-id="main-content">
      <ion-menu menu-id="main-menu" side="start" content-id="main-content" type="overlay">
        <ion-header>
          <ion-toolbar>
            <ion-title>Options</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list lines="none">
            <ion-menu-toggle :auto-hide="false">
              <ion-item :detail="false" router-link="/home">Home</ion-item>
            </ion-menu-toggle>
            <ion-menu-toggle :auto-hide="false">
              <ion-item :detail="false" router-link="/message/1">Sample message</ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main-content" />
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
</script>
