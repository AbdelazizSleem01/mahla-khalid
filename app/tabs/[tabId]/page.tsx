import VisitorTracker from '@/components/VisitorTracker'
import TabContent from '@/components/TabContent'

interface PageProps {
    params: Promise<{ tabId: string }>
}

export default async function TabPage({ params }: PageProps) {
    const { tabId } = await params

    return (
        <>
            <VisitorTracker />
            <TabContent tabId={tabId} />
        </>
    )
}
