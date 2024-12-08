import API from "@/utils/axiosClient";
import { IUser, JWSPayload } from "@/types/user";
import jwt, { verify } from "jsonwebtoken";
// import { getUserImg } from "@/utils/utils";
import { AuthRole, UserRole } from "@/types/role";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY || "fallback-public-key";

export function extractRoleInfo(
  user: IUser,
  authRole: AuthRole,
  userRole: UserRole
) {
  return {
    ...user,
    // imageUrl: getUserImg(authRole, userRole),
    userRole: userRole,
    authRole: authRole,
  } as IUser;
}

export async function auth(value: IUser) {
  await API.post(
    "/api/auth",
    { ...value },
    {
      baseURL: "https://localhost:3000",
    }
  );
}

// export async function getMe(sessionToken: string) {
//   try {
//     const res = await API.get<{ message: string; dto: IUser; error?: boolean }>(
//       "/auth/me",
//       {
//         headers: {
//           Authorization: `Bearer ${sessionToken}`,
//         },
//       },
//     );
//     const decodeData = jwtDecode<JWTPayload>(res.data.dto.accessToken);
//     return {
//       message: res.data.message,
//       dto: extractRoleInfo(
//         res.data.dto,
//         decodeData.authRole,
//         decodeData.userRole,
//       ),
//     };
//   } catch (e) {
//     return {
//       message: "Failed to retrieve me",
//       dto: null,
//       error: true,
//     };
//   }
// }

export async function getMe(sessionToken: string) {
  try {
    const res = await API.get<{ message: string; dto: IUser; error?: boolean }>(
      "/auth/me",
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );

    const decodeData = jwt.verify(res.data.dto.accessToken, publicKey, {
      algorithms: ["RS256"],
    }) as JWSPayload;

    return {
      message: res.data.message,
      dto: extractRoleInfo(
        res.data.dto,
        decodeData.authRole,
        decodeData.userRole
      ),
    };
  } catch (e) {
    return {
      message: "Failed to retrieve me",
      dto: null,
      error: true,
    };
  }
}

export async function signOut() {
  await API.post(
    "/api/logout",
    {},
    {
      baseURL: "https://localhost:3000",
    }
  );
}

export async function login(values: {
  emailOrPhone: string;
  password: string;
}) {
  const res = await API.post<{ message: string; dto: IUser }>("/auth/sign-in", {
    emailOrPhone: values.emailOrPhone,
    password: values.password,
  });

  const decodeData = jwt.verify(res.data.dto.accessToken, publicKey, {
    algorithms: ["RS256"],
  }) as JWSPayload;

  return extractRoleInfo(
    res.data.dto,
    decodeData.authRole,
    decodeData.userRole
  );
}
