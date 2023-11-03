import { RenderResult, act} from "@testing-library/react"
import { render } from "../../test-utils"
import axios from "axios";
import { mockState, renderWithState } from "../../lib/testHelpers";
import { TripList } from "./tripList.component";
import jsonTrips from '../../data/trips.json';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Trip List", ()=> {

  beforeAll(() =>{
    mockedAxios.create.mockReturnThis();
  })

  it("Shows empty if backend returns no trips", async () =>{
    mockedAxios.get.mockResolvedValueOnce({data: []});

    let container : RenderResult;
    await act(async() =>{
      container = await render(renderWithState(<TripList />, mockState));
    });
    expect(() => container!.getByTestId('trip-tile')).toThrow();

  });

  it("Shows empty if backend errors", async () =>{
    mockedAxios.get.mockRejectedValueOnce({ok: false});

    let container : RenderResult;
    await act(async() =>{
      container = await render(renderWithState(<TripList />, mockState));
    });
    expect(() => container!.getByTestId('trip-tile')).toThrow();
  });
    
  it("Shows list if backend returns trips", async () =>{
    mockedAxios.get.mockResolvedValueOnce({data: jsonTrips});

    let container : RenderResult;
    await act(async() =>{
      container = await render(renderWithState(<TripList />, mockState));
    });
    const tile = await container!.findAllByTestId('trip-tile');
    expect(tile).toBeTruthy();
    
  });

  it("Shows 30 elements backend returns more than 30 trips", async () =>{
    jest.mocked(mockedAxios.get).mockResolvedValue({data: jsonTrips});

    let container : RenderResult;
    await act(async() =>{
      container = await render(renderWithState(<TripList />, mockState));
    });
    const tiles = await container!.findAllByTestId('trip-tile');
    expect(tiles.length).toBe(30)

  });

});
