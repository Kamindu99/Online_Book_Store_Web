import { useEffect, useRef, useState } from 'react';

// material-ui
import { Box, Dialog, SpeedDial, Tooltip, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

// third-party
import { DateSelectArg, EventClickArg, EventDropArg, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';

// project imports
import { PopupTransition } from 'components/@extended/Transitions';
import Loader from 'components/Loader';
import AddEventForm from 'sections/parameter-management/holiday-calendar/AddEventForm';
import CalendarStyled from 'sections/parameter-management/holiday-calendar/CalendarStyled';
import Toolbar from 'sections/parameter-management/holiday-calendar/Toolbar';
import { selectEvent, selectRange, toggleModal, updateCalendarView, updateEvent } from 'store/reducers/calendar';

// types
import { PlusOutlined } from '@ant-design/icons';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { fetchCalendarCodes, toInitialState } from 'store/reducers/system-calendar';
import List from 'sections/parameter-management/holiday-calendar/list';
import useAuth from 'hooks/useAuth';

// ==============================|| CALENDAR - MAIN ||============================== //

const Calendar = () => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState<boolean>(true);
  const { calendarView, isModalOpen, selectedRange } = useSelector((state) => state.calendar);
  const [eventName, setEventName] = useState<any>([]);
  const { error, success, calendarCodes } = useSelector((state) => state.systemCalendar);

  const { user } = useAuth();

  const selectedEvent = useSelector((state) => {
    const { selectedEventId } = state.calendar;

    if (selectedEventId) {
      return eventName.find((event: any) => event.id === selectedEventId);
    }
    return null;
  });

  useEffect(() => {
    dispatch(fetchCalendarCodes());
  }, [success]);

  useEffect(() => {

    if (calendarCodes === undefined || calendarCodes === null) return;
    if (calendarCodes?.length === 0) return;

    setEventName(
      calendarCodes?.map((event: any) => {
        return {
          title: event.reason,
          description: event.reason,
          start: new Date(event.holidayDate),
          end: new Date(event.holidayDate),
          allDay: true,
          id: event._id,
          startDate: event.holidayDate,
        }
      })
    );
  }, [calendarCodes, success])


  useEffect(() => {
    const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
    const viewCall = dispatch(updateCalendarView(newView));
    // const eventCall = dispatch(getEvents());
    const eventCall: any = [];
    Promise.all([viewCall, eventCall]).then(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownSM]);

  const calendarRef = useRef<FullCalendar>(null);

  const [date, setDate] = useState(new Date());

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  //alert model
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
  };

  // calendar toolbar events
  const onClickAllHoliday = () => {
    handleAlertClose()
  };

  const handleViewChange = (newView: string) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  // calendar events
  const handleRangeSelect = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }

    dispatch(selectRange(arg.startStr, arg.endStr));
  };

  const handleEventSelect = (arg: EventClickArg) => {
    dispatch(selectEvent(arg.event._def.publicId));
  };

  const handleEventUpdate = async ({ event }: EventResizeDoneArg | EventDropArg) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = () => {
    dispatch(toggleModal());
  };

  //  handel error 
  useEffect(() => {
    if (error != null && typeof error === 'object' && 'message' in error) {
      dispatch(
        openSnackbar({
          open: true,
          message: (error as { message: string }).message, // Type assertion
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
      dispatch(toInitialState());
    }
  }, [error]);

  useEffect(() => {
    if (success != null) {
      dispatch(
        openSnackbar({
          open: true,
          message: success,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      dispatch(toInitialState());
    }
  }, [success])

  if (loading) return <Loader />;

  return (
    <Box sx={{ position: 'relative' }}>
      <CalendarStyled>
        <Toolbar
          date={date}
          view={calendarView}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onClickAllHoliday={onClickAllHoliday}
          titleAllHoliday={openAlert ? 'Calendar' : 'All Holiday'}
          onChangeView={handleViewChange}
        />
        {!openAlert &&
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            events={eventName as EventSourceInput}
            ref={calendarRef}
            rerenderDelay={10}
            initialDate={date}
            initialView={calendarView}
            dayMaxEventRows={3}
            eventDisplay="block"
            headerToolbar={false}
            allDayMaintainDuration
            eventResizableFromStart
            select={handleRangeSelect}
            eventDrop={handleEventUpdate}
            eventClick={handleEventSelect}
            eventResize={handleEventUpdate}
            height={matchDownSM ? 'auto' : 720}
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          />
        }
        {openAlert && calendarCodes &&
          <List data={calendarCodes} />
        }
      </CalendarStyled>

      {/* Dialog renders its body even if not open */}
      {isModalOpen && user && user.email === 'wanigasinghebookcollection@gmail.com' &&
        <Dialog
          maxWidth="sm"
          TransitionComponent={PopupTransition}
          fullWidth
          onClose={handleModal}
          open={isModalOpen}
          sx={{ '& .MuiDialog-paper': { p: 0 } }}
        >
          <AddEventForm event={selectedEvent} range={selectedRange} onCancel={handleModal} />
        </Dialog>
      }
      {user && user.email === 'wanigasinghebookcollection@gmail.com' &&
        <Tooltip title="Add New Event">
          <SpeedDial
            ariaLabel="add-event-fab"
            sx={{ display: 'inline-flex', position: 'sticky', bottom: 24, left: '100%', transform: 'translate(-50%, -50% )' }}
            icon={<PlusOutlined style={{ fontSize: '1.5rem' }} />}
            onClick={handleModal}
          />
        </Tooltip>
      }
    </Box>
  );
};

export default Calendar;
