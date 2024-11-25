import { callApi } from "@/components/Excel";
import { sleep } from "./sleep";

export async function sendRequestsInBatches(
  promises: any[],
  batchSize: number,
  delayTime: number
) {
  const results = [];

  try {
    for (let i = 0; i < promises.length; i += batchSize) {
      const batchPromises = promises
        .slice(i, i + batchSize)
        .reduce((arr, valArr) => {
          arr.push(
            Promise.allSettled(
              valArr.map((obj: any) =>
                callApi(obj.value)
                  .then((res) => ({ ...res, address: obj?.address || "" }))
                  .finally(obj.callback)
              )
            )
          );
          return arr;
        }, []);
      console.log(`Sending batch ${Math.floor(i / batchSize) + 1}`);

      // {batchPromises}개의 요청을 한 번에 보내고 결과를 기다림
      const batchResults = await Promise.allSettled(batchPromises);

      results.push(batchResults);

      // 다음 배치 전 대기
      if (i + batchSize < promises.length) {
        console.log(
          `Waiting for ${delayTime / 1000} seconds before sending next batch...`
        );
        await sleep(delayTime);
      }
    }
  } catch (err) {
    throw new Error(`sendRequestsInBatches error - ${err}`);
  }

  return results;
}
