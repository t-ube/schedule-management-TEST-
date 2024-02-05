// ユーザーを取得します
export async function GET(
  req: Request
) {
  const { searchParams } = new URL(req.url)

  // パラメータの検証
  if (!searchParams.has('firebaseId')) {
    // firebaseId がないのでエラー
    return new Response(JSON.stringify({ message: "firebaseId is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const firebaseId = searchParams.get('firebaseId')

  try {
    // Express サーバーにリクエスト
    const response = await fetch('http://localhost:4000/api/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"firebaseId": firebaseId}),
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










type GetUserData = {
  firebaseId: string;
};

type PutUserData = {
  firebaseId: string;
  email: string;
  name: string;
};

type PostUserData = {
  userId: string;
  email: string;
  name: string;
};


// ユーザーを新規登録します
export async function PUT(
  req: Request
) {
  const { firebaseId, email, name } = await req.json();
  return new Response(`firebaseId:${firebaseId},email:${email},name:${name}`, {
    status: 200,
  })
}

// ユーザーを更新します
export async function POST(
  req: Request
) {
  const { userId, email, name } = await req.json();
  return new Response(`userId:${userId},email:${email},name:${name}`, {
    status: 200,
  })
}
