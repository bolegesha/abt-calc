import { Columns3, LucideIcon } from 'lucide-react'
import { FC } from 'react'

// Define the interface for sidebar items
interface SidebarItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

// Define props interface for the Sidebar component
interface SidebarProps {
    items: SidebarItem[];
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    onItemClick: (sectionId: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({ items, isCollapsed, setIsCollapsed, onItemClick }) => {
    return (
        <div className="relative">
            <div
                className={`
                    min-h-screen bg-[#F5F5F7] border-r border-[#E5E5EA] transition-all duration-300
                    ${isCollapsed ? 'w-20' : 'w-[280px]'}
                `}
            >
                <nav className="p-4">
                    <ul className="space-y-2">
                        {items.map(({ icon: Icon, label, href }) => (
                            <li key={label}>
                                <button
                                    onClick={() => onItemClick(href.slice(1))}
                                    className="w-full text-left flex items-center p-3 hover:bg-white rounded-xl transition-colors duration-300 focus:outline-none"
                                >
                                    <Icon
                                        size={20}
                                        className="text-[#0066CC] flex-shrink-0"
                                    />
                                    <span
                                        className={`
                                            ml-3 text-[15px] font-medium text-[#1D1D1F] transition-opacity duration-300
                                            ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
                                        `}
                                    >
                                        {label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Collapse/Expand Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute top-4 -right-4 p-2 bg-white rounded-full shadow-md hover:bg-[#F5F5F7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 z-50"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <Columns3
                    size={20}
                    className={`text-[#0066CC] transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                />
            </button>
        </div>
    )
}