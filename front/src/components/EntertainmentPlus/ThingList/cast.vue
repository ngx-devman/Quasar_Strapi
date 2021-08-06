<template>
  <div
  class='cursor-pointer'
    :class="active === index ? 'detail-card' : ''"
    @click="$emit('detail', index)"
  >
    <div class="card cast-member-card">
      <div class="card__header">
        <img class="card__header__image" :src="thing.image" />
        <div class="card__header__info">
          <div class="card-info__title">{{ thing.name }}</div>
          <div class="card-info__subtitle">{{ thing.role }}</div>
        </div>
      </div>
      <div v-show="expanded" class="card__body">{{ thing.description }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['thing', 'index', 'active'],
  computed: {
    // For when an actor is active(clicked on), return variable to expand/shrink the card
    expanded () {
      let outcome
      if (this.active === this.index) outcome = true
      else outcome = false
      return outcome
    }
  },
  // Call for Animate Grid CSS
  mounted () {
    this.$emit('initializeGrid')
  }
}
</script>
<style lang="stylus" scoped>
.card {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(1px, 1fr) minmax(1px, 1fr); /* Safari doesn't like raw fr values, need to run a calculation */
  grid-gap: 1em;
  -webkit-overflow-scrolling: touch; /* Bouncy scroll on iOS */
}
.cast-member-card {
  background-color: rgba(27, 27, 27, 0.9);
  padding: 20px;
  border-radius: 0.2em;
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "header";
  grid-template-rows: 100%;
  grid-template-columns: 100%;
}

.card__header {
  grid-area: header;
  display: grid;
  grid-template-areas: "headerImage" "headerInfo";
  grid-template-rows: minmax(1px, 3fr) minmax(1px, 1fr);
  grid-gap: 2em;
  height: 100%;
}

.card__header__image {
  grid-area: headerImage;
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.card__header__info {
  grid-area: headerInfo;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card-info__title {
  font-size: 17px;
  margin-bottom: 4px;
}

.card-info__subtitle {
  font-style: italic;
  font-size: 15px;
  opacity: 0.7;
}

.card__body {
  grid-area: body;
  font-size: 18px;
  line-height: 1.4em;
  position: relative;
  text-transform: none;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* Bouncy scroll on iOS */
}

.detail-card {
  grid-row: span 2;
  grid-column: span 2;
  overflow: hidden;
}

.detail-card .cast-member-card {
  grid-template-areas: "header" "body";
  grid-template-rows: minmax(1px, 2fr) minmax(1px, 3fr);
}

.detail-card .card__header {
  width: 75%;
  margin: auto;
  grid-template-areas: "headerImage headerInfo";
  grid-template-columns: minmax(1px, 1fr) minmax(1px, 2fr);
  grid-template-rows: minmax(1px, 1fr);
}

.detail-card .card-info__title {
  font-size: 20px;
}

@media all and (max-width: 640px){
  .card__body {
    display none;
  }

  .detail-card {
    grid-row: 1!important;
    grid-column: 1!important;
    overflow: visible;
  }

  .detail-card .cast-member-card {

  }

  .detail-card .card__header {
    color: #e9bb13;
    width: 100%;
  }

  .detail-card .card-info__title,
  .detail-card .card-info__subtitle {
    color: #e9bb13;
    font-size: 16px;
  }

  .detail-card .card__header__image {
    border: 2px solid #fff;
  }

  .cast-member-card {
    display flex;
    justify-content: center;
    background: none;
    padding 0;
  }

  .card__header {
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }

  .card-info__title {
    opacity: 1;
    font-weight: bold;
    font-size: 16px;
  }

  .card-info__subtitle {
    color: #a5a5a5;
    font-size: 16px;
    opacity: 1;
  }

  .card__header__image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    position: relative;
    overflow: hidden;
    object-fit: cover;
    object-position: top;
  }
}
</style>
