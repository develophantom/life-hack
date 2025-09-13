import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeftIcon,
  CalendarIcon,
  PlusIcon,
  ClockIcon,
  MapPinIcon,
  FileTextIcon,
  UsersIcon,
  MoreHorizontalIcon
} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/container';

interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  location?: string;
  type: 'work' | 'meeting' | 'break' | 'travel' | 'personal';
  color: string;
  attendees?: string[];
  attachments?: string[];
  agenda?: string[];
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Workout',
    startTime: '06:00',
    endTime: '07:00',
    description: 'Gym session',
    type: 'personal',
    color: '#10B981',
  },
  {
    id: '2',
    title: 'Project X',
    startTime: '09:00',
    endTime: '11:00',
    description: 'Just work',
    type: 'work',
    color: '#8B5CF6',
    attendees: ['Team Alpha'],
  },
  {
    id: '3',
    title: 'Client Call',
    startTime: '11:30',
    endTime: '12:00',
    description: 'Quick check-in',
    type: 'meeting',
    color: '#3B82F6',
    attendees: ['Client A'],
  },
  {
    id: '4',
    title: 'Road',
    startTime: '12:00',
    endTime: '13:00',
    location: '116 New Montgomery St #700, San Francisco, CA 94105',
    type: 'travel',
    color: '#6B7280',
  },
  {
    id: '5',
    title: 'Team Meeting',
    startTime: '13:00',
    endTime: '15:00',
    type: 'meeting',
    color: '#3B82F6',
    agenda: ['Last updates', 'Weekly plan', 'Role distribution'],
    attachments: ['Jun-8_commute.pptx'],
    attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
  },
  {
    id: '6',
    title: 'Lunch break',
    startTime: '15:00',
    endTime: '16:00',
    type: 'break',
    color: '#F59E0B',
  },
  {
    id: '7',
    title: 'Design Review',
    startTime: '16:00',
    endTime: '17:00',
    description: 'UI/UX review session',
    type: 'work',
    color: '#8B5CF6',
    attendees: ['Design Team'],
  },
  {
    id: '8',
    title: 'Evening Reading',
    startTime: '20:00',
    endTime: '21:00',
    description: 'Personal development time',
    type: 'personal',
    color: '#10B981',
  },
  {
    id: '9',
    title: 'Late Night Work',
    startTime: '22:00',
    endTime: '24:00',
    description: 'Catch up on emails',
    type: 'work',
    color: '#8B5CF6',
  },
  {
    id: '10',
    title: 'Early Morning Prep',
    startTime: '25:00',
    endTime: '26:00',
    description: 'Prepare for tomorrow',
    type: 'work',
    color: '#8B5CF6',
  },
];

// Expanded hourly timeline with more hours for better daily planning
const HOURS = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00'] as const;

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState<Event[]>(mockEvents);
  const [pressedEvent, setPressedEvent] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to current time on component mount
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Calculate position for current time (each hour is 80px)
    const currentTimePosition = (currentHour * 80) + (currentMinute * 80 / 60);
    const scrollOffset = Math.max(0, currentTimePosition - 160); // Show current time in upper third

    // Scroll to current time after layout is ready
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: scrollOffset,
        animated: true,
      });
    }, 150);
  }, []);

  const getEventPosition = (event: Event, eventIndex: number) => {
    const startHour = parseInt(event.startTime.split(':')[0]);
    const endHour = parseInt(event.endTime.split(':')[0]);
    const startMinute = parseInt(event.startTime.split(':')[1]);
    const endMinute = parseInt(event.endTime.split(':')[1]);

    // Handle 24+ hours (next day events)
    const adjustedEndHour = endHour >= 24 ? endHour : endHour;

    // Calculate position from midnight (00:00)
    const startPosition = startHour * 60 + startMinute;
    const duration = (adjustedEndHour - startHour) * 60 + (endMinute - startMinute);

    // Find overlapping events and calculate horizontal offset
    let horizontalOffset = 0;
    let overlappingEvents = 0;

    for (let i = 0; i < eventIndex; i++) {
      const otherEvent = events[i];
      const otherStartHour = parseInt(otherEvent.startTime.split(':')[0]);
      const otherEndHour = parseInt(otherEvent.endTime.split(':')[0]);
      const otherStartMinute = parseInt(otherEvent.startTime.split(':')[1]);
      const otherEndMinute = parseInt(otherEvent.endTime.split(':')[1]);

      const otherStartPosition = otherStartHour * 60 + otherStartMinute;
      const otherDuration = (otherEndHour - otherStartHour) * 60 + (otherEndMinute - otherStartMinute);
      const otherEndPosition = otherStartPosition + otherDuration;

      const eventEndPosition = startPosition + duration;

      // Check if events overlap
      if (startPosition < otherEndPosition && eventEndPosition > otherStartPosition) {
        overlappingEvents++;
        horizontalOffset = Math.min(overlappingEvents * 4, 12); // Max 12px offset
      }
    }

    return {
      top: startPosition * 80 / 60, // Convert minutes to pixels (80px per hour)
      height: Math.max(duration * 80 / 60, 72), // Convert duration to pixels, minimum 72px
      marginLeft: horizontalOffset,
      width: overlappingEvents > 0 ? `${100 - (overlappingEvents * 2)}%` : '100%',
    };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="px-6 pt-6 pb-6 bg-background border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 rounded-xl bg-gray-50 items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <Icon as={ArrowLeftIcon} className="text-gray-700" size={20} />
          </TouchableOpacity>

          <View className="items-center flex-1 px-4">
            <Text className="text-gray-900 text-2xl font-bold leading-tight">Daily Schedule</Text>
            <Text className="text-gray-500 text-sm mt-0.5 font-medium">{formatDate(selectedDate)}</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/schedule/add-event')}
            className="w-11 h-11 rounded-xl bg-blue-600 items-center justify-center"
            style={{
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <Icon as={PlusIcon} className="text-white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-6 py-6">
          {/* Timeline Container */}
          <View className="flex-row">
            {/* Time Column */}
            <View className="w-16 mr-4">
              {HOURS.map((hour, index) => (
                <View key={hour} className="h-20 justify-start pt-1">
                  <Text className="text-gray-400 text-xs font-semibold tracking-wider">
                    {hour}
                  </Text>
                </View>
              ))}
            </View>

            {/* Events Column */}
            <View className="flex-1 relative bg-white rounded-2xl" style={{ height: HOURS.length * 80, marginLeft: 8, marginRight: 8 }}>
              {/* Timeline Lines */}
              {HOURS.map((hour, index) => (
                <View
                  key={`line-${hour}`}
                  className="absolute left-0 right-0 h-px bg-gray-100"
                  style={{ top: index * 80, marginLeft: 16, marginRight: 16 }}
                />
              ))}

              {/* Current Time Indicator */}
              {(() => {
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const currentTimePosition = (currentHour * 80) + (currentMinute * 80 / 60); // 80px per hour

                return (
                  <View
                    className="absolute z-20"
                    style={{
                      top: currentTimePosition - 1,
                      left: 0,
                      right: 0,
                    }}
                  >
                    {/* Current time line */}
                    <View className="h-0.5 bg-red-500 mx-4" />
                    {/* Time indicator dot */}
                    <View
                      className="absolute bg-red-500 rounded-full border-2 border-white"
                      style={{
                        width: 10,
                        height: 10,
                        left: 10,
                        top: -4,
                        shadowColor: '#EF4444',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                        elevation: 2,
                      }}
                    />
                  </View>
                );
              })()}

              {/* Events */}
              {events.map((event, eventIndex) => {
                const position = getEventPosition(event, eventIndex);

                return (
                  <TouchableOpacity
                    key={event.id}
                    className={`absolute bg-white rounded-xl p-3 border border-gray-50 ${pressedEvent === event.id ? 'scale-98' : 'scale-100'
                      }`}
                    style={{
                      top: position.top,
                      left: 16 + position.marginLeft,
                      right: 16,
                      width: position.width,
                      height: Math.max(position.height, 72),
                      shadowColor: event.color,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: pressedEvent === event.id ? 0.15 : 0.08,
                      shadowRadius: pressedEvent === event.id ? 8 : 4,
                      elevation: pressedEvent === event.id ? 3 : 2,
                      borderLeftWidth: 3,
                      borderLeftColor: event.color,
                    }}
                    onPress={() => router.push(`/schedule/edit-event/${event.id}`)}
                    onPressIn={() => setPressedEvent(event.id)}
                    onPressOut={() => setPressedEvent(null)}
                  >
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-1">
                        <Text className="text-gray-900 font-semibold text-sm leading-tight mb-0.5">
                          {event.title}
                        </Text>
                        <Text className="text-gray-400 text-xs font-medium">
                          {event.startTime} – {event.endTime}
                        </Text>
                      </View>
                      <TouchableOpacity className="p-1 -m-1">
                        <Icon as={MoreHorizontalIcon} className="text-gray-300" size={14} />
                      </TouchableOpacity>
                    </View>

                    {/* Event Details */}
                    {position.height > 80 && (
                      <View className="space-y-1.5 mt-1">
                        {event.description && (
                          <Text className="text-gray-600 text-xs leading-tight">
                            {event.description}
                          </Text>
                        )}

                        {event.location && (
                          <View className="flex-row items-start gap-1.5">
                            <Icon as={MapPinIcon} className="text-gray-400 mt-0.5" size={12} />
                            <Text className="text-gray-600 text-xs flex-1 leading-tight">
                              {event.location.length > 40 ? `${event.location.substring(0, 40)}...` : event.location}
                            </Text>
                          </View>
                        )}

                        {event.agenda && event.agenda.length > 0 && (
                          <View className="space-y-0.5">
                            {event.agenda.slice(0, 2).map((item, index) => (
                              <View key={index} className="flex-row items-start gap-1.5">
                                <View className="w-1 h-1 bg-gray-400 rounded-full mt-1.5" />
                                <Text className="text-gray-600 text-xs leading-tight">
                                  {item}
                                </Text>
                              </View>
                            ))}
                            {event.agenda.length > 2 && (
                              <Text className="text-gray-400 text-xs ml-3">
                                +{event.agenda.length - 2} more
                              </Text>
                            )}
                          </View>
                        )}

                        <View className="flex-row items-center gap-3 mt-1">
                          {event.attendees && event.attendees.length > 0 && (
                            <View className="flex-row items-center gap-1">
                              <Icon as={UsersIcon} className="text-gray-400" size={10} />
                              <Text className="text-gray-500 text-xs">
                                {event.attendees.length}
                              </Text>
                            </View>
                          )}

                          {event.attachments && event.attachments.length > 0 && (
                            <View className="flex-row items-center gap-1">
                              <Icon as={FileTextIcon} className="text-gray-400" size={10} />
                              <Text className="text-gray-500 text-xs">
                                {event.attachments.length}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>


        </View>
      </ScrollView>
    </Container>
  );
}
