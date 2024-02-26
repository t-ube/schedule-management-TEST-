// 実績を取得します
export async function GET(
  req: Request
) {
  const { searchParams } = new URL(req.url)

  // パラメータの検証
  if (!searchParams.has('userId')) {
    // userId がないのでエラー
    return new Response(JSON.stringify({ message: "userId is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  if (!searchParams.has('startDate')) {
    // startDate がないのでエラー
    return new Response(JSON.stringify({ message: "startDate is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  if (!searchParams.has('endDate')) {
    // endDate がないのでエラー
    return new Response(JSON.stringify({ message: "endDate is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const userId = searchParams.get('userId')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  try {
    // Express サーバーにリクエスト
    const response = await fetch('http://localhost:4000/api/getRecordsList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "userId": userId,
          "startDate": startDate,
          "endDate": endDate
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


// 実績を保存します
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

  if (data.date === undefined) {
    // date がないのでエラー
    return new Response(JSON.stringify({ message: "date is required" }), {
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
  const date = data.date
  const duration = data.duration
  const note = data.note

  try {
    // Express サーバーにリクエスト
    const response = await fetch('http://localhost:4000/api/createRecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "userId": userId,
          "date": date,
          "duration": duration,
          "note": note
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
