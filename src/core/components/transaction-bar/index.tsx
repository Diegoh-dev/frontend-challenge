import React, { useState } from 'react'

import If from '@/core/components/conditions/if'
import Tabs, { Tab } from '../tabs'
import BetsTab from './tabs/bets'
import HistoryTab from './tabs/history'
import BestTab from './tabs/best'
import Footer from '@/core/components/footer'
import { Chat } from '../chat'

type Props = {
  variant: string
}

export default function TransactionBar({ variant }: Props) {
  const [activeTab, setActiveTab] = useState('chat')

  const tabs: Tab[] = [
    { key: 'chat', title: 'Chat' },
    { key: 'bets', title: 'Apostas' },
    { key: 'history', title: 'Histórico' },
    // { key: 'best', title: 'Estatísticas' },
  ]

  return (
    <div className="h-full pb-8">
      <div className="flex flex-col transaction-bar min-h-[400px] flex-1 grow h-full w-full p-3 rounded-[28px] bg-opacity-20 border border-gray-600 border-opacity-20 relative ">
        <section className="w-full flex justify-center ">
          <div className="w-full sm:w-[98%]">
            <Tabs
              tabs={tabs}
              size="w-1/2"
              active={activeTab}
              toggle={setActiveTab}
              variant={variant}
              isButtons={false}
            />
          </div>
        </section>

        <If condition={activeTab == 'chat'}>
        <Chat/>
        </If>

        <If condition={activeTab == 'bets'}>
          <BetsTab />
        </If>

        <If condition={activeTab == 'history'}>
          <HistoryTab />
        </If>

        <If condition={activeTab == 'best'}>
          <BestTab />
        </If>
      </div>
      <Footer />
    </div>
  )
}
