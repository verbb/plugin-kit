<script setup>
import { onMounted } from 'vue';
import { useRouter, withBase } from 'vitepress';

const target = withBase('/getting-started/overview');
const router = useRouter();

onMounted(() => {
    router.go(target);
});
</script>

<meta http-equiv="refresh" :content="`0; url=${target}`">

# Redirecting

If you are not redirected automatically, continue to [Getting Started](/getting-started/overview).
