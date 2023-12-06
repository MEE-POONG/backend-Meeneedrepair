import SideNav from "./sidenav"
import HeaderPage from './HeaderPage';
import { Kanit } from 'next/font/google'

const kanit = Kanit({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
})


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  const openSidebar = () => {
    // Implement openNav functionality
  };
  return (
    <section className={kanit.className}>
      <SideNav openSidebar={openSidebar} />
      <main className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-9 pb-4 ">
        <div><HeaderPage /></div>
        <div className="mt-5">
          {children}
        </div>
      </main>
    </section>
  )
}