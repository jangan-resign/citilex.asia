import { getSeoTopics } from "../../../actions/cms";
import { TopicsBankClient } from "../../../components/cms/TopicsBankClient";

export const dynamic = "force-dynamic";

export default async function CmsTopicsPage() {
  const topics = await getSeoTopics();
  return <TopicsBankClient initialTopics={topics} />;
}
