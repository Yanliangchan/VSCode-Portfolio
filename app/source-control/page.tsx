import { Metadata } from 'next';

import SourceControlTimeline from '@/components/SourceControlTimeline';

export const metadata: Metadata = {
  title: 'Source Control',
};

const SourceControlPage = () => <SourceControlTimeline />;

export default SourceControlPage;
