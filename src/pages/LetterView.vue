<script setup>
import { useRoute } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import api from '../utils/api.js';
import { computed, onMounted, ref } from 'vue';
import PasswordRequest from '../components/LetterView/PasswordRequest.vue';
import { theme, setTheme } from '../composables/useTheme.js';

const route = useRoute();

const id = route.params.id;

const letter = ref({
    title: null,
    content: null,
    style_theme: 'base'
});

const requestPassword = ref(false);
const errorMessage = ref('');

onMounted(() => {
    api(`letters/${id}/get`, {}, 'POST')
    .then(res => {
        if (res.error) {
            requestPassword.value = true;
            return;
        }
        
        letter.value = res;
        setTheme(letter.value.style_theme);
    })
    .catch(err => {
        console.error(err);
    });
});

const letterContent = computed(() => {
    if (!letter.value.content) {
        return [];
    }

    return letter.value.content.split('\n');
});

function getLetterWithPassword(password) {
    api(`letters/${id}/get`, { password }, 'POST')
    .then(res => {
        if (res.error) {
            errorMessage.value = res.error ?? 'Falha ao enviar senha';
            return;
        }

        letter.value = res;
        setTheme(letter.value.style_theme);
        errorMessage.value = '';
        requestPassword.value = false;
    })
    .catch(err => {
        console.error(err);
    });
}
</script>

<template>
    <MainLayout>
        <PasswordRequest
            v-if="requestPassword"
            @send-password="pass => getLetterWithPassword(pass)"
            :error-message="errorMessage"
        />

        <div v-else class="px-4 min-h-lvh">
            <h2
                :class="[
                    theme.letter.title,
                    'font-bold text-lg lg:text-3xl mb-4'
                ]"
            >
                {{ letter?.title ?? 'N/A' }}
            </h2>

            <p
                :class="[
                    theme.letter.paragraph,
                    'my-4 indent-4'
                ]"
                v-for="(paragraph, i) of letterContent"
                :key="i"
            >
                {{ paragraph ?? 'N/A' }}
            </p>
        </div> 
    </MainLayout>
</template>
