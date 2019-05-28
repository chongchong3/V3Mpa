<template>
    <BasePage>
        <router-view></router-view>
    </BasePage>
</template>

<script>
import BasePage from '@/components/BasePage'

import {} from '@api/gov/townCheck'

export default {
    components: {
        BasePage
    }
};
</script>
