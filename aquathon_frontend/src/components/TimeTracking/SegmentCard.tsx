'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useToast } from '@/hooks/use-toast';

import { SEGMENT_COLORS, SEGMENT_TYPES } from '@/domains/race/constants';
import { ISegment } from '@/domains/race/interface';

const SegmentCard: React.FC<{
  segment: ISegment;
  totalParticipant: number | undefined;
  completedParticipants: number | undefined;
  startTime: Date | undefined;
}> = ({ segment, totalParticipant, completedParticipants, startTime }) => {
  const { type } = segment;

  const basePath = window.location.pathname.includes('/shared') ? '/shared' : '/races';
  const { slug } = useParams();
  const { _id } = segment;
  const router = useRouter();
  const { toast } = useToast();
  const handleClick = () => {
    if (startTime === null) {
      toast({
        title: 'Warning!',
        description: 'Please Start The race first',
        variant: 'destructive',
      });
      return;
    }
    router.push(`${basePath}/${slug}/time-tracking/${_id}`);
  };

  return (
    <button onClick={handleClick} className='block w-full'>
      <div className='flex flex-col bg-white rounded-lg shadow-xl mb-4 overflow-hidden'>
        <CardHeader type={type} />
        <CardBody
          completedParticipants={completedParticipants!}
          totalParticipants={totalParticipant!}
          type={segment.type}
        />
      </div>
    </button>
  );
};

const CardHeader: React.FC<{ type: ISegment['type'] }> = ({ type }) => (
  <div className='flex items-center p-4 pb-0'>
    <StatusIcon type={type} />
    <div className='text-lg font-bold flex-grow text-start'>
      <h3>{SEGMENT_TYPES[type].text}</h3>
    </div>
    <Image src='/assets/icons/ic_clock.svg' alt='Clock icon' width={30} height={30} />
  </div>
);

const StatusIcon: React.FC<{ type: ISegment['type'] }> = ({ type }) => (
  <div className={clsx('w-12 h-12 rounded-full flex items-center justify-center mr-4', SEGMENT_COLORS[type].bg)}>
    <Image src={SEGMENT_TYPES[type].icon} alt={`${type} icon`} width={32} height={32} />
  </div>
);

const CardBody: React.FC<{
  completedParticipants: number | 0;
  totalParticipants: number;
  type: string;
}> = ({ completedParticipants, totalParticipants, type }) => (
  <div className='px-4 pb-4'>
    <div className='text-center mb-2 text-sm font-medium'>
      {completedParticipants ? completedParticipants.toString().padStart(2, '0') : '00'}/
      {totalParticipants.toString().padStart(2, '0')}
    </div>
    <ProgressBar progress={(completedParticipants / totalParticipants) * 100} type={type} />
  </div>
);

const ProgressBar: React.FC<{ progress: number; type: string }> = ({ progress, type }) => (
  <div className='w-full h-2 bg-gray-200 rounded-full relative'>
    <div
      className={`absolute top-0 left-0 h-full bg-blue-500 rounded-full ${SEGMENT_COLORS[type].bg}`}
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default SegmentCard;
