<script setup>
import { ref } from 'vue';

const password = ref('');

const emits = defineEmits(['send-password']);

const props = defineProps({errorMessage: String});

const sendPasword = (ev) => {
    ev.preventDefault();

    if (!password.value) {
        return;
    }

    emits('send-password', password.value);
}
</script>

<template>
    <div class="px-4 min-h-lvh">
        <h3 class="font-bold text-lg">Senha requisitada</h3>

        <p class="my-4">Essa carta está protegia por uma senha, peça para quem te mandou esse link que te repasse a senha.</p>

        <form class="flex flex-col mx-auto align-middle items-center gap-4" action="#">
            <div class="input">
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="password" />
                <span v-if="props.errorMessage" class="text-red-500 font-medium ml-2">{{ props.errorMessage }}</span>
            </div>

            <div class="flex my-4">
                <button
                    class="px-8 py-4 m-4 bg-slate-800 hover:bg-slate-700 transition border-2 border-slate-400 font-bold text-xl cursor-pointer"
                    @click="sendPasword"
                >
                    Enviar Senha
                </button>
            </div>
        </form>
    </div> 
</template>

<style scoped>
@reference "tailwindcss";

.input {
    @apply flex flex-col w-full gap-2;
}

.input label {
    font-weight: bold;
}

.input input{
    @apply border-2 border-slate-400 bg-slate-800 pl-2 py-2;
}
</style>
