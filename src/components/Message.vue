<template>
  <div>
    <div v-if="type === 'admin'" class="system">
      <p class="text-center font-italic">{{ text }}</p>
    </div>
    <div v-else class="msg-wrapper">
      <div class="msg" :class="{owner}">
        <p class="msg__text">{{ text }}</p>
        <div class="msg__information">
          <!-- eslint-disable -->
          <p class="msg__name">
            {{$t('message.send')}} {{$t('message.by')}}
            <span>{{ name }}</span>
            {{$t('message.at')}} {{ time }}
          </p>
          <!-- eslint-enable -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    type: String,
    text: String,
    time: String,
    owner: Boolean
  }
};
</script>

<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;
  color: #fff;
  font-size: 14px;
  p {
    margin-bottom: 1rem;
  }
}

.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 1rem;
  width: 60%;
  // margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  position: relative;
  word-break: break-all;
  margin-bottom: 1rem;

  &__information {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
  }

  &__name {
    // font-weight: 700;
    font-style: italic;
    margin: 0;
    padding: 0;
    font-weight: 300;
    font-size: 12px;
    span {
      font-weight: 600;
    }
  }

  &__date {
    text-decoration: underline;
    margin-left: 15px;
    margin: 0;
    padding: 0;
    font-weight: 300;
    font-size: 12px;
  }

  &__text {
    margin-bottom: 0;
    text-align: left;
    font-size: 17px;
    margin: 0;
    padding: 0;
    font-weight: 300;
    font-size: 16px;
  }
}

.owner {
  background: #fff;
  color: #000;
  align-self: flex-end;
}
</style>
