<script setup>
import Header from './partials/Header.vue';
import { theme } from '../composables/useTheme.js';

</script>

<template>
    <section 
        :class="[
            theme.layout.body,
            'min-h-screen flex flex-col'
        ]"
    >
        <Header />

        <main class="flex-1">
            <section
                :class="[
                    theme.layout.container,
                    'max-w-4xl mx-auto h-full border-x-2 p-4'
                ]"
            >
                <slot></slot>
            </section>
        </main>
    </section>
</template>