<script setup lang="ts">
import { trpc } from "@/index";
import { computed, onMounted, ref, type Ref } from "vue";
import Loading from "./profile/Loading.vue";
import WithUser from "./profile/withUser.vue";
import type { MeResult } from "@common/users/MeResult";
import LoggedOut from "./profile/LoggedOut.vue";
import type { ProfilePicture } from "@common/users/ProfilePicture";

const user_data: Ref<MeResult | null> = ref(null);
const loading: Ref<boolean> = ref(true);

onMounted(async () => {
    const query = await trpc.user.me.query();
    user_data.value = query;
    loading.value = false;
});

function profilePictureUrl(picture: ProfilePicture): string {
    const idx = picture.indexOf(":");
    const kind = picture.slice(0, idx);
    const value = picture.slice(idx + 1);
    return kind === "custom"
        ? `/uploads/avatars/${value}.png`
        : `/avatars/${value}.png`;
}

const data = computed(() => {
    if (!user_data.value || !user_data.value.is_logged_in) return null;

    return {
        username: user_data.value.data.username,
        displayName: user_data.value.data.displayName,
        profilePicture: profilePictureUrl(user_data.value.data.profilePicture),
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
