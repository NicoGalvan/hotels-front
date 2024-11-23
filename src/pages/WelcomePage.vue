<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 class="text-5xl font-bold text-blue-600 mb-4">Bienvenido a NicolasSoft</h1>
        <p class="text-lg text-gray-700 mb-8">
            Una plataforma para registrar hoteles y administrar sus habitaciones de manera sencilla y eficiente.
        </p>
        <button @click="empezar"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Empezar
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const empezar = () => {
    router.push('/hotels'); 
};
</script>
