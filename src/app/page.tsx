import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Badge variant='success'>Hai</Badge>
      <Button>Button</Button>
      <Textarea />
    </Fragment>
  );
}
