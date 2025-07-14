// utils/googleCalendar.ts
export const createMeet = async () => {
  return new Promise((resolve, reject) => {
    const CLIENT_ID = '477719530044-5v604oflkrv3esn9bjoo0t08kg2hap5i.apps.googleusercontent.com'
    const API_KEY = 'YOUR_API_KEY'
    const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

    const event = {
      summary: 'LEAP Demo Call',
      description: 'This is your scheduled Google Meet call',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 mins later
        timeZone: 'Asia/Kolkata',
      },
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(2),
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    }

    function gapiLoad() {
      gapi.load('client:auth2', async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: SCOPES,
        })

        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        if (!isSignedIn) {
          await gapi.auth2.getAuthInstance().signIn()
        }

        gapi.client.calendar.events
          .insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1,
          })
          .then((response) => {
            const meetLink =
              response.result?.conferenceData?.entryPoints?.[0]?.uri
            resolve(meetLink)
          })
          .catch((err) => reject(err))
      })
    }

    gapiLoad()
  })
}
