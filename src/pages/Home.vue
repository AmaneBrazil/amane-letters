<script setup>
import { ref, watch } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import RegisteredModal from '../components/RegisteredModal.vue';
import api from '../utils/api.js';
import { theme, setTheme } from '../composables/useTheme.js';

const form = ref({
    title: '',
    content: '',
    password: '',
    style_theme: 'base'
});

const validatedForm = ref({
    title: true,
    content: true
});

const usePassword = ref(false);

watch(usePassword, () => {
    form.value.password = '';
});

watch(
    () => form.value.style_theme, 
    (v) => {
        setTheme(v);
    }
);

const registeredId = ref(null);

const createLetter = (ev) => {
    ev.preventDefault();

    let validated = true;

    if (!form.value.title) {
        validatedForm.value.title = false;
        validated = false;
    }
    else {
        validatedForm.value.title = true;
    }

    if (!form.value.content) {
        validatedForm.value.content = false;
        validated = false;
    }
    else {
        validatedForm.value.content = true;
    }

    if (!validated) {
        return;
    }

    api('letters', form.value, 'POST')
    .then(res => {
        registeredId.value = res.id;
    });
}
</script>

<template>
    <MainLayout>
        <div class="px-4">
            <h2 :class="theme.letter.title">Escrever carta</h2>

            <p :class="theme.letter.paragraph">
                Aqui você poderá escrever uma carta e deixar registrada em um link, envie a uma pessoa desejada para a sua leitura!
            </p>

            <form class="flex flex-col mx-auto align-middle items-center gap-4" action="#">
                <div class="input">
                    <label for="title">Título da carta:</label>
                    <input type="text" id="title" :class="theme.inputs.input" v-model="form.title" />
                    <span class="text-red-400 font-medium" v-if="!validatedForm.title">Escreva um título para a sua carta</span>
                </div>

                <div class="input">
                    <label for="style_theme">Estilo da carta:</label>
                    <select id="style_theme" :class="theme.inputs.input" v-model="form.style_theme">
                        <option value="base">Padrão</option>
                        <option value="lovely">Romântico</option>
                    </select>
                </div>
            
                <div class="input">
                    <label for="content">Mensagem:</label>
                    <textarea id="content" :class="theme.inputs.input" v-model="form.content" rows="12"></textarea>
                    <span class="text-red-400 font-medium" v-if="!validatedForm.content">Você precisa escrever a sua carta</span>
                </div>

                <div class="flex gap-4 items-center w-full">
                    <label class="font-bold" for="use_password">Encobrir carta com senha:</label>
                    <input
                        :class="theme.inputs.input" 
                        type="checkbox"
                        id="use_password"
                        v-model="usePassword"
                    />
                </div>

                <div class="input" v-if="usePassword">
                    <label for="password">Senha:</label>
                    <input type="password" id="password" :class="theme.inputs.input"  v-model="form.password" />
                </div>

                <div class="flex">
                    <button
                        :class="[
                            theme.button.primary,
                            'px-8 py-4 border-2 font-bold'
                        ]"
                        @click="createLetter"
                    >
                        Criar Mensagem
                    </button>
                </div>
            </form>
        </div> 
        
        <RegisteredModal
            :id="registeredId"
            :form="form"
            @close-modal="() => registeredId = null"
        />
    </MainLayout>

</template>

<style scoped>
@reference "tailwindcss";

.input {
    @apply flex flex-col w-full gap-2;
}

.input label {
    font-weight: bold;
}

.input input, .input select, .input textarea {
    @apply p-2 border-2;
}
</style>
