import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type BreadcrumbItemConfig = {
  label: string;
  href?: string;
};

interface HeaderSectionProps {
  breadcrumbs: BreadcrumbItemConfig[];
  title: string;
  handleTambah?: () => void;
}

export function HeaderSection({
  breadcrumbs,
  title,
  handleTambah,
}: HeaderSectionProps) {
  return (
    <div className="mb-10 flex w-full flex-col gap-5 uppercase text-2xs font-semibold px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin'>
              DASHBOARD
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold italic">{title}</h1>

        {handleTambah && (
          <Button variant={"ghost"} onClick={handleTambah} className='text-[#3385FF] text-sm font-semibold'>
            <PlusCircle />
            Tambah Baru
          </Button>
        )}
      </div>
    </div>
  );
}
