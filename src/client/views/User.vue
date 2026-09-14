<script setup lang="ts">
import { useRoute } from "vue-router";
import { trpc } from "..";
import ContentColumn from "@/components/ContentColumn.vue";
import UserProfile from "@/components/User/Profile.vue";
import { ref, type Ref } from "vue";
import type * as user from "@common/users";
import QuickButtons from "@/components/User/QuickButtons.vue";
import type { ProfilePicture } from "@common/profilePicture";
import ProjectsView from "@/components/User/ProjectsView.vue";

const route = useRoute();

const username = route.params.username as string;

const userData: Ref<user.fetch.Result | null> = ref(null);

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
    userData.value = user_fetch;
} catch (e) {
    // todo: error handle
}
</script>

<template>
    <ContentColumn>
        <div v-if="userData">
            <UserProfile
                :display-name="userData.displayName"
                :username="userData.username"
                :profile-picture="profilePictureUrl(userData.profilePicture)"
            />
            <QuickButtons v-if="userData.userIsYou" :username="userData.username" />
            <h1>my projects:</h1>
            <p>&lt:3</p>
            <ProjectsView :username="userData.username" />
        </div>
        <div v-else>
            <h1>user not found!</h1>
        </div>
    </ContentColumn>
</template>
