import { computed, ref } from 'vue'
import themes from '../themes'

const selectedTheme = ref('base');

const theme = computed(() => {
    return themes[selectedTheme.value] ?? themes.base;
});

function setTheme(theme) {
    selectedTheme.value = theme;
}

export {
    theme,
    selectedTheme,
    setTheme
}