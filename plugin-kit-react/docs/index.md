<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vitepress';

const target = '/getting-started/overview';
const router = useRouter();

onMounted(() => {
    router.go(target);
});
</script>

<meta http-equiv="refresh" content="0; url=/getting-started/overview">

# Redirecting

If you are not redirected automatically, continue to [Getting Started](/getting-started/overview).
