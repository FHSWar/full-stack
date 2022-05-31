import { createVNode, defineAsyncComponent, defineComponent, ref, resolveComponent } from 'vue'
import { useRoute } from 'vue-router';
import { startCase } from 'lodash';

export default defineComponent({
    name: 'Result',
    components: {
        NoFound: defineAsyncComponent(() => import('./no-found')),
        ServerError: defineAsyncComponent(() => import('./server-error')),
        Unauthorized: defineAsyncComponent(() => import('./unauthorized'))
    },
    setup() {
        const resultType = useRoute().params.type;
        const resultTypePascal = ref('ServerError')

        if (resultType && !Array.isArray(resultType)) {
            resultTypePascal.value = startCase(resultType).replace(/ /g, '')
        }

        return () => (
            <div style={
                {
                    display: 'flex',
                    'justify-content': 'center',
                    'align-items': 'center',
                    height: '100%'
                }
            }>
                {/* vue的createVNode和h是一回事 */}
                {createVNode(resolveComponent(resultTypePascal.value))}
            </div>
        )
    }
})