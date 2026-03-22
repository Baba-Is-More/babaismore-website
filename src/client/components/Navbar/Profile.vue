<script setup lang="ts">
import { trpc } from "@/index";
import { computed, onMounted, ref, type Ref } from "vue";
import Loading from "./profile/Loading.vue";
import WithUser from "./profile/withUser.vue";
import type { MeResult } from "@common/users/MeResult";
import LoggedOut from "./profile/LoggedOut.vue";

const user_data: Ref<MeResult | null> = ref(null);
const loading: Ref<boolean> = ref(true);

onMounted(async () => {
    const query = await trpc.user.me.query();
    user_data.value = query;
    loading.value = false;
});

const data = computed(() => {
    if (!user_data.value || !user_data.value.is_logged_in) return null;

    return {
        username: user_data.value.data.username,
        displayName: user_data.value.data.displayName,
        profilePicture:
            "/uploads/avatars/" + user_data.value.data.profilePicture + ".png",
    };
});

const currentComponent = computed(() => {
    if (loading.value == true) return Loading;

    const user: MeResult | null = user_data.value;
    if (user == null) throw "expected a user after loading finished";

    if (!user.is_logged_in) {
        return LoggedOut;
    } else {
        return WithUser;
    }
});
</script>

<template>
    <!-- tells vue to use the `currentComponent` variable, if it is not null. -->
    <component :is="currentComponent" v-if="currentComponent" v-bind="data" />
</template>
