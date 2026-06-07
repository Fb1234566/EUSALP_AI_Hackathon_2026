<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Bavaria Protected Areas Decision Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="dashboard-container">
        <!-- Header Question -->
        <div class="question-header">
          <h2>Decision question</h2>
          <p class="question-text">“Where should we redirect weekend visitors when the National Park is overcrowded?”</p>
        </div>

        <div class="main-content">
          <!-- Map Section -->
          <div class="map-section">
            <div id="map" class="map-container"></div>
            <div class="legend">
              <div class="legend-item"><span class="color-box" style="background-color: darkgreen;"></span> Bavarian Forest Gateway (National Park)</div>
              <div class="legend-item"><span class="color-box" style="background-color: blue;"></span> Upper Isar Meadows (Natura 2000)</div>
              <div class="legend-item"><span class="color-box" style="background-color: lightgreen;"></span> Altmühl Valley Discovery Zone (Nature Park)</div>
            </div>
          </div>

          <!-- Side Panel Section -->
          <div class="side-panel">
            <h3>Decision Proposals</h3>
            <div class="proposals-list">
              <div class="proposal-card" v-for="proposal in proposals" :key="proposal.rank">
                <div class="proposal-rank">Rank {{ proposal.rank }}</div>
                <div class="proposal-title">{{ proposal.title }}</div>
                <div class="proposal-why"><strong>Why:</strong> {{ proposal.why }}</div>
              </div>
            </div>

            <div class="demo-value">
              <strong>Demo value:</strong> This is the clearest demo for stakeholders: the system does not simply promote empty places. It checks whether the alternative place can absorb the same visitor demand without ecological damage.
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const proposals = ref([
  {
    rank: 1,
    title: 'Promote Altmühl Valley as the alternative weekend destination',
    why: 'Similar family-friendly nature experience, lower pressure, good services'
  },
  {
    rank: 2,
    title: 'Do not redirect mass visitors to Upper Isar Meadows',
    why: 'Natura 2000 area is too sensitive despite low crowding'
  },
  {
    rank: 3,
    title: 'Add real-time parking warning for Bavarian Forest Gateway',
    why: 'Reduces unnecessary car arrivals once parking exceeds 85%'
  },
  {
    rank: 4,
    title: 'Fund signage and toilets in Altmühl Valley',
    why: 'The visitor profile requires family services before promotion'
  }
]);

onMounted(() => {
  // Initialize map centered on Bavaria roughly
  const map = L.map('map').setView([48.8, 11.5], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Define polygons
  // 1. Bavarian Forest Gateway (Dark green)
  const bavarianForest = L.polygon([
    [49.0, 13.0],
    [48.8, 13.5],
    [48.9, 13.8],
    [49.1, 13.3]
  ], { color: 'darkgreen', fillColor: 'darkgreen', fillOpacity: 0.6 }).addTo(map);
  
  bavarianForest.bindPopup(`
    <div class="popup-content">
      <h4>Bavarian Forest Gateway<br><small>National Park</small></h4>
      <ul>
        <li><b>Main visitors:</b> Families, casual hikers, nature photographers</li>
        <li><b>Mobility pattern:</b> 78% car-oriented</li>
        <li><b>Peak time:</b> Saturday/Sunday, 10:00–15:00</li>
        <li><b>Needs:</b> Parking, toilets, short loop trails, simple signage</li>
        <li><b>Pressure:</b> Parking 94%, trail crowding high</li>
        <li><b>Risk:</b> Medium ecological pressure near lake viewpoints</li>
      </ul>
    </div>
  `);

  // 2. Upper Isar Meadows (Blue)
  const upperIsar = L.polygon([
    [47.8, 11.3],
    [47.9, 11.4],
    [47.95, 11.55],
    [47.85, 11.45]
  ], { color: 'blue', fillColor: 'blue', fillOpacity: 0.6 }).addTo(map);

  upperIsar.bindPopup(`
    <div class="popup-content">
      <h4>Upper Isar Meadows<br><small>Natura 2000</small></h4>
      <ul>
        <li><b>Main visitors:</b> Birdwatchers, quiet-nature visitors, school groups</li>
        <li><b>Mobility pattern:</b> 55% car, 30% bike, 15% public transport</li>
        <li><b>Peak time:</b> Spring weekends</li>
        <li><b>Needs:</b> Guided access, interpretation panels</li>
        <li><b>Pressure:</b> Low visitor pressure, high ecological sensitivity</li>
        <li><b>Risk:</b> High: nesting birds, trampling risk</li>
      </ul>
    </div>
  `);

  // 3. Altmühl Valley Discovery Zone (Light green)
  const altmuhlValley = L.polygon([
    [48.9, 10.8],
    [49.0, 11.2],
    [48.85, 11.5],
    [48.75, 11.1]
  ], { color: '#90EE90', fillColor: '#90EE90', fillOpacity: 0.6 }).addTo(map); // Light green

  altmuhlValley.bindPopup(`
    <div class="popup-content">
      <h4>Altmühl Valley Discovery Zone<br><small>Nature Park</small></h4>
      <ul>
        <li><b>Main visitors:</b> Families, cyclists, food/culture visitors</li>
        <li><b>Mobility pattern:</b> 45% car, 35% bike, 20% train</li>
        <li><b>Peak time:</b> Sunday afternoon</li>
        <li><b>Needs:</b> Bike parking, food stops, route signage</li>
        <li><b>Pressure:</b> Moderate, still below capacity</li>
        <li><b>Risk:</b> Low ecological sensitivity</li>
      </ul>
    </div>
  `);
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  background-color: #f5f6f9;
}

.question-header {
  margin-bottom: 16px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.question-header h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: #333;
}

.question-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a73e8;
  margin: 8px 0 0 0;
}

.main-content {
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex: 1;
  min-height: 0; /* Important for flex child to be able to scroll or have fixed height */
}

.map-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.map-container {
  flex: 1;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.legend {
  margin-top: 12px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.color-box {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  border-radius: 4px;
}

.side-panel {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.side-panel h3 {
  margin-top: 0;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
}

.proposals-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.proposal-card {
  background: #f9f9f9;
  border-left: 4px solid #1a73e8;
  padding: 12px;
  border-radius: 4px;
}

.proposal-rank {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #666;
  font-weight: bold;
  margin-bottom: 4px;
}

.proposal-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 6px;
  color: #333;
}

.proposal-why {
  font-size: 0.9rem;
  color: #555;
}

.demo-value {
  margin-top: 24px;
  background: #e8f0fe;
  padding: 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #1a73e8;
}

.popup-content h4 {
  margin: 0 0 8px 0;
}

.popup-content ul {
  padding-left: 20px;
  margin: 0;
}

.popup-content li {
  margin-bottom: 4px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  .map-section, .side-panel {
    flex: none;
    height: 500px;
  }
}
</style>
