// スケジュールを取得します
export async function GET(
  req: Request
) {

  try {
    // Express サーバーにリクエスト
    const response = await fetch('http://localhost:4000/api/getSchedulesList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      // リクエストが成功
      const jsonResponse = await response.json();
      return new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } else {
      // リクエストが失敗
      return new Response(JSON.stringify({ message: response.statusText }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
  } catch (error) {
    // 通信が失敗 (502エラー:Bad Gatewayとする)
    return new Response(JSON.stringify({ message: "Failed to connect to the server" }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

// スケジュールを新規登録します
export async function POST(
  req: Request
) {
  const data = await req.json();
  
  // パラメータの検証
  if (data.userId === undefined) {
    // userId がないのでエラー
    return new Response(JSON.stringify({ message: "userId is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  if (data.dayOfWeekId === undefined) {
    // dayOfWeekId がないのでエラー
    return new Response(JSON.stringify({ message: "dayOfWeekId is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  if (data.duration === undefined) {
    // duration がないのでエラー
    return new Response(JSON.stringify({ message: "duration is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const userId = data.userId
  const dayOfWeekId = data.dayOfWeekId
  const duration = data.duration

  try {
    // Express サーバーにリクエスト
    const response = await fetch('http://localhost:4000/api/createSchedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "userId": userId,
          "dayOfWeekId": dayOfWeekId,
          "duration": duration
        }
      ),
    });

    if (response.ok) {
      // リクエストが成功
      const jsonResponse = await response.json();
      return new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } else {
      // リクエストが失敗
      return new Response(JSON.stringify({ message: response.statusText }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
  } catch (error) {
    // 通信が失敗 (502エラー:Bad Gatewayとする)
    return new Response(JSON.stringify({ message: "Failed to connect to the server" }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}


// スケジュールを更新します
export async function PUT(
  req: Request
) {
  const data = await req.json();
  
  // パラメータの検証
  if (data.scheduleId === undefined) {
    // scheduleId がないのでエラー
    return new Response(JSON.stringify({ message: "scheduleId is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  if (data.duration === undefined) {
    // duration がないのでエラー
    return new Response(JSON.stringify({ message: "duration is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const scheduleId = data.scheduleId
  const duration = data.duration

  try {
    // Express サーバーにリクエスト
    const response = await fetch('http://localhost:4000/api/updateSchedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "scheduleId": scheduleId,
          "duration": duration
        }
      ),
    });

    if (response.ok) {
      // リクエストが成功
      const jsonResponse = await response.json();
      return new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } else {
      // リクエストが失敗
      return new Response(JSON.stringify({ message: response.statusText }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
  } catch (error) {
    // 通信が失敗 (502エラー:Bad Gatewayとする)
    return new Response(JSON.stringify({ message: "Failed to connect to the server" }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
