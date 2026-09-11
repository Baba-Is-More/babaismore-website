<script setup lang="ts">
import { useRoute } from "vue-router";
import { trpc } from "..";
import ContentColumn from "@/components/ContentColumn.vue";
import UserProfile from "@/components/User/Profile.vue";
import { ref, type Ref } from "vue";
import type { UserFetchResult } from "@common/fetch/UserFetchResult";
import QuickButtons from "@/components/User/QuickButtons.vue";
import type { ProfilePicture } from "@common/users/ProfilePicture";
import ProjectsView from "@/components/User/ProjectsView.vue";

const route = useRoute();

const username = route.params.username as string;

const user: Ref<UserFetchResult | null> = ref(null);

function profilePictureUrl(picture: ProfilePicture): string {
    const idx = picture.indexOf(":");
    const kind = picture.slice(0, idx);
    const value = picture.slice(idx + 1);
    return kind === "custom"
        ? `/uploads/avatars/${value}.png`
        : `/avatars/${value}.png`;
}

try {
    const user_fetch = await trpc.user.fetch.query({ username });
    user.value = user_fetch;
} catch (e) {
    // todo: error handle
}
</script>

<template>
    <ContentColumn>
        <div v-if="user">
            <UserProfile
                :display-name="user.displayName"
                :username="user.username"
                :profile-picture="profilePictureUrl(user.profilePicture)"
            />
            <QuickButtons v-if="user.userIsYou" :username="user.username" />
            <h1>my projects:</h1>
            <p>&lt:3</p>
            <ProjectsView />
        </div>
        <div v-else>
            <h1>user not found!</h1>
        </div>
    </ContentColumn>
</template>
