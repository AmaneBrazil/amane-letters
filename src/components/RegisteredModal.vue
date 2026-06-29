<script setup>
import { theme } from '../composables/useTheme';

const originURL = window.location.origin;

const props = defineProps({
    id: String,
    form: Object
});

defineEmits([
    'closeModal'
]);

async function copyToClipboard(textToClip) {
    try {
        await navigator.clipboard.writeText(textToClip);
    } catch (err) {
        console.error(err);
    }
}
</script>

<template>
    <div
        v-if="props.id"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
        <div
            :class="[
                theme.layout.body,
                'w-full max-w-2xl rounded-md shadow-xl p-4'
            ]"
            @click.stop
        >
            <h3 class="font-bold text-xl">Mensagem registrada</h3>

            <p class="my-4">
                Agora sua mensagem está finalmente criada, parabéns! Agora é só enviar
                o link registrado abaixo para a(s) pessoas(s) que você deseja mostrar a mensagem:
            </p>

            <p
                :class="[
                    theme.button.primary,
                    'p-2 cursor-pointer active:text-blue-500'
                ]"
                @click="copyToClipboard(`${originURL}/view/${props.id}`)"
            >
                {{ `${originURL}/view/${props.id}` }}
            </p>

            <div v-if="form.password">
                <p class="my-4">
                    Não se esqueça que como você colocou uma senha nessa carta,
                    ele vai precisar digitar a senha
                    abaixo para acessar a sua carta:
                </p>
                
                <span
                    :class="[
                        theme.button.primary,
                        'p-4 block w-auto text-center text-2xl mx-auto tracking-wide cursor-pointer active:text-blue-500'
                    ]"
                    @click="copyToClipboard(form.password)"
                >
                    {{ form.password }}
                </span>
            </div>
        </div>
    </div>   
</template>

