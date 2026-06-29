<script setup>
import { theme } from '../../composables/useTheme';
</script>

<template>
    <header
        :class="[
            theme.header.bg,
            'p-3 border-b-2'
        ]"
    >
        <router-link to="/">
            <h1 class="text-md lg:text-3xl hover:opacity-80 font-bold">
                Amane Letters - Escreva sua carta Online
            </h1>
        </router-link>
    </header>
</template>